import { describe, test, expect, beforeAll, afterEach } from "@jest/globals";
import { db } from "@/db";
import * as nodemailer from "nodemailer";
import { POST } from "@/app/api/authentication/register/verify-email/route";

// Mock the db module
jest.mock("@/db");

// Mock nodemailer at the top level
jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn(),
  }),
}));

describe("verifyEmail", () => {
  const mockDbSelect = jest.fn(); // Mock db.select method
  const mockSendMail = nodemailer.createTransport().sendMail as jest.Mock;

  beforeAll(() => {
    // Mock db.select to return controlled values
    db.select = mockDbSelect as any;
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test("should return an error if the email is already in use", async () => {
    // Mock db.select to simulate an existing user
    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{ email: "user@example.com" }]),
        }),
      }),
    });

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        email: "nonexistent@example.com",
        template: "<h1>Verfication code </h1>",
      }),
    } as unknown as Request;

    const result = await POST(mockRequest);
    const jsonResult = await result.json();

    expect(jsonResult).toEqual({
      success: false,
      message: "Email address already in use.",
    });
    expect(mockDbSelect).toHaveBeenCalled(); // Check if db.select was called
  });

  test("should send a verification email successfully", async () => {
    // Mock db.select to simulate a non-existing user
    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]), // No existing user
        }),
      }),
    });

    mockSendMail.mockResolvedValue({}); // Simulate successful email sending

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        email: "newuser@example.com",
        template: "<h1>Test Template</h1>",
      }),
    } as unknown as Request;

    const result = await POST(mockRequest);
    const jsonResult = await result.json();

    // Ensure sendMail was called with the expected arguments
    expect(jsonResult).toEqual({
      success: true,
      message: "Verification code sent successfully.",
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: "newuser@example.com",
      to: "newuser@example.com",
      replyTo: "newuser@example.com",
      subject: `Verification Code for Pair Dev Finder`,
      html: "<h1>Test Template</h1>",
    });
  });

  test("should return an error if the email sending fails", async () => {
    // Mock db.select to simulate a non-existing user
    mockDbSelect.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]), // No existing user
        }),
      }),
    });

    // Simulate email sending failure
    mockSendMail.mockRejectedValue(new Error("SMTP Error"));

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        email: "newuser@example.com",
        template: "<h1>Test Template</h1>",
      }),
    } as unknown as Request;
    const result = await POST(mockRequest);

    const jsonResult = await result.json();

    expect(jsonResult).toEqual({
      success: false,
      message: "Unable to send verification email. Please try again later.",
    });

    // Ensure sendMail was called
    expect(mockSendMail).toHaveBeenCalledWith({
      from: "newuser@example.com",
      to: "newuser@example.com",
      replyTo: "newuser@example.com",
      subject: `Verification Code for Pair Dev Finder`,
      html: "<h1>Test Template</h1>",
    });
  });
});
