import { describe, test, expect } from "@jest/globals";
import * as bcrypt from "bcrypt";
import { checkLoginUser } from "@/app/authentication/login/actions";
import { db } from "@/db";

jest.mock("@/db");
jest.mock("bcrypt");

describe("checkLoginUser", () => {
  const mockDbSelect = jest.fn();
  const mockBcryptCompare = jest.fn();

  beforeAll(() => {
    db.select = mockDbSelect as any;
    jest.spyOn(bcrypt, "compare").mockImplementation(mockBcryptCompare);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return an error if the email does not exist", async () => {
    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    });

    const result = await checkLoginUser({
      email: "nonexistent@example.com",
      password: "password123",
    });

    expect(result).toEqual({
      success: false,
      message: "Email does not exist",
    });
  });

  test("should return an error if the user has no password", async () => {
    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{ email: "user@example.com" }]),
        }),
      }),
    });

    const result = await checkLoginUser({
      email: "user@example.com",
      password: "password123",
    });

    expect(result).toEqual({
      success: false,
      message: "Looks like you've registered with Google or GitHub",
    });
  });

  test("should return an error if the password is incorrect", async () => {
    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest
            .fn()
            .mockResolvedValue([
              { email: "user@example.com", password: "hashedPassword" },
            ]),
        }),
      }),
    });

    mockBcryptCompare.mockResolvedValue(false);

    const result = await checkLoginUser({
      email: "user@example.com",
      password: "wrongPassword",
    });

    expect(result).toEqual({
      success: false,
      message: "Wrong password",
    });
  });

  test("should return success if the password is correct", async () => {
    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest
            .fn()
            .mockResolvedValue([
              { email: "user@example.com", password: "hashedPassword" },
            ]),
        }),
      }),
    });

    mockBcryptCompare.mockResolvedValue(true);

    const result = await checkLoginUser({
      email: "user@example.com",
      password: "correctPassword",
    });

    expect(result).toEqual({
      success: true,
      message: "Login successful",
    });
  });

  test("should return an error if an unexpected error occurs", async () => {
    mockDbSelect.mockImplementation(() => {
      throw new Error("Unexpected database error");
    });

    const result = await checkLoginUser({
      email: "user@example.com",
      password: "password123",
    });

    expect(result).toEqual({
      success: false,
      message: "Error: Unexpected database error",
    });
  });
});
