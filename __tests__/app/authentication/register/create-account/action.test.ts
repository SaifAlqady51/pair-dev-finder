import { describe, test, expect } from "@jest/globals";
import { createUserAccount } from "@/app/authentication/register/create-account/actions";
import { db } from "@/db";
import { users } from "@/db/schema";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

// Mock drizzle-orm's sql function
jest.mock("drizzle-orm", () => ({
  sql: jest.fn(() => "mockedSQL"), // Mock the sql function
  eq: jest.fn(), // Mock the eq function
}));

// Mock the db module
jest.mock("@/db");

// Mock bcrypt
jest.mock("bcrypt");

describe("createUserAccount", () => {
  const mockDbSelect = jest.fn();
  const mockDbInsert = jest.fn();
  const mockBcryptHash = bcrypt.hash as jest.Mock;
  const mockEq = eq as jest.Mock; // Ensure eq is mocked as a Jest function

  const mockUser = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock db.select to return controlled values
    db.select = mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn(),
        }),
      }),
    });

    // Mock db.insert
    db.insert = mockDbInsert.mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockUser]),
      }),
    });

    // Mock bcrypt.hash to return a hashed password
    mockBcryptHash.mockResolvedValue("hashedPassword123");

    // Mock drizzle-orm's eq function
    mockEq.mockReturnValue("mockedCondition"); // Now this will work
  });

  test("should create a user account successfully", async () => {
    // Mock db.select to simulate no existing user
    mockDbSelect().from().where().limit.mockResolvedValue([]);

    const result = await createUserAccount(mockUser);

    // Assertions
    expect(result).toEqual({
      success: true,
      message: "Account created successfully.",
    });

    // Ensure db.select was called to check for existing user
    expect(mockDbSelect).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith(users.email, mockUser.email);

    // Ensure bcrypt.hash was called with the correct arguments
    expect(mockBcryptHash).toHaveBeenCalledWith(
      mockUser.password,
      parseInt(process.env.SALT_ROUNDS!),
    );

    // Ensure db.insert was called with the correct arguments
    expect(mockDbInsert).toHaveBeenCalled();
    expect(mockDbInsert().values).toHaveBeenCalledWith({
      ...mockUser,
      password: "hashedPassword123",
    });
  });

  test("should return an error if the user already exists", async () => {
    // Mock db.select to simulate an existing user
    mockDbSelect().from().where().limit.mockResolvedValue([mockUser]);

    const result = await createUserAccount(mockUser);

    // Assertions
    expect(result).toEqual({
      success: false,
      message: "A user with this email already exists.",
    });

    // Ensure db.select was called to check for existing user
    expect(mockDbSelect).toHaveBeenCalledWith();
    expect(mockEq).toHaveBeenCalledWith(users.email, mockUser.email);

    // Ensure db.insert was not called
    expect(mockDbInsert).not.toHaveBeenCalled();
  });

  test("should handle errors gracefully", async () => {
    // Mock db.select to throw an error
    mockDbSelect()
      .from()
      .where()
      .limit.mockRejectedValue(new Error("Database error"));

    const result = await createUserAccount(mockUser);

    // Assertions
    expect(result).toEqual({
      success: false,
      message: "Error: Database error",
    });
  });
});
