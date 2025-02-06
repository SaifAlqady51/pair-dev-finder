import { describe, test, expect, beforeAll, afterEach } from "@jest/globals";
import { db } from "@/db";
import bcrypt from "bcrypt";
import { POST } from "@/app/api/authentication/login/route";

// Mock dependencies
jest.mock("@/db");

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
// Test setup
describe("Login API", () => {
  let hashedPassword: string;
  const mockDbSelect = jest.fn();

  beforeAll(async () => {
    // Hash the password and wait for it to complete
    hashedPassword =
      "$2b$10$FIDTzKp4pNkrIQ45AHVU.e6m0xoMP2TIHCF6Gj409gQ3bhMLiibmm";
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    db.select = mockDbSelect as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should successfully login a user", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        email: "test@example.com",
        password: "Password1234#",
      }),
    } as unknown as Request;

    const mockUser = {
      id: "user123",
      name: "Test User",
      email: "test@example.com",
      emailVerified: new Date(),
      password: hashedPassword,
      image: "https://example.com/user.jpg",
    };

    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockUser]),
        }),
      }),
    });

    // Mock bcrypt.compare before the test
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("Login successful");
    expect(mockDbSelect).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "Password1234#",
      mockUser.password,
    );
  });

  test("should return an error for a non-existent email", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        email: "nonexistent@example.com",
        password: "password123",
      }),
    } as unknown as Request;

    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Email does not exist");
  });

  test("should return an error for missing password due to social login", async () => {
    const mockRequest = {
      json: jest
        .fn()
        .mockResolvedValue({ email: "socialuser@example.com", password: "" }),
    } as unknown as Request;

    const mockUser = { email: "socialuser@example.com", password: null };

    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockUser]),
        }),
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe(
      "Looks like you've registered with Google or GitHub",
    );
  });

  test("should return an error for incorrect password", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        email: "test@example.com",
        password: "wrongpassword",
      }),
    } as unknown as Request;

    const mockUser = {
      email: "test@example.com",
      password: hashedPassword,
    };

    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockUser]),
        }),
      }),
    });

    // Mock bcrypt.compare to return false for incorrect password
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toBe("Wrong password");
  });

  test("should handle unexpected errors", async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error("Unexpected error")),
    } as unknown as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toContain("Error: Unexpected error");
  });
});
