import { describe, test, expect, beforeAll, afterEach } from "@jest/globals";
import { GET, POST } from "@/app/api/rooms/route";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

// Mock the dependencies
jest.mock("@/db");
jest.mock("next/cache");
jest.mock("@auth/drizzle-adapter", () => ({
  DrizzleAdapter: jest.fn().mockImplementation((db) => ({
    is: jest.fn(),
  })),
}));

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(), // mock globally
}));

describe("Rooms API", () => {
  const mockDbSelect = jest.fn();
  const mockDbInsert = jest.fn();
  const mockRevalidatePath = jest.fn();

  beforeAll(() => {
    db.select = mockDbSelect as any;
    db.insert = mockDbInsert as any;
    (revalidatePath as jest.Mock) = mockRevalidatePath;
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  describe("GET /api/rooms", () => {
    test("should fetch rooms successfully", async () => {
      const mockRooms = [
        {
          id: "f39e6c6e-21b2-4a6d-8f23-7e5d7cd153c8",
          userId: "1",
          name: "Sample Room",
          tags: "Tag1, Tag2, Tag3",
          githubRepo: "https://github.com/sample/repository",
          description: "This is a hardcoded description for the room.",
          created_at: "2025-02-01T12:34:56.789Z",
        },
      ];

      mockDbSelect.mockReturnValue({
        from: jest.fn().mockReturnValue({
          orderBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockRooms),
          }),
        }),
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual(mockRooms);
      expect(mockDbSelect).toHaveBeenCalled();
    });

    test("should handle errors when fetching rooms", async () => {
      mockDbSelect.mockImplementation(() => {
        throw new Error("Database error");
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain("Error fetching rooms.");
    });
  });

  describe("POST /api/rooms", () => {
    test("should create a room successfully", async () => {
      const mockRoomData = {
        userId: "1",
        name: "Sample Room",
        tags: "Tag1, Tag2, Tag3",
        githubRepo: "https://github.com/sample/repository",
        description: "This is a hardcoded description for the room.",
      };
      const mockInsertedRoom = {
        id: "2",
        ...mockRoomData,
        created_at: new Date().toISOString(),
      };

      mockDbInsert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockInsertedRoom]),
        }),
      });

      (getSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });

      const req = {
        json: jest.fn().mockResolvedValue(mockRoomData),
      } as unknown as Request;

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toEqual([mockInsertedRoom]);
      expect(mockDbInsert).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalledWith("/");
    });

    test("should return an error if user is not signed in", async () => {
      const mockRoomData = {
        userId: "1",
        name: "Sample Room",
        tags: "Tag1, Tag2, Tag3",
        githubRepo: "https://github.com/sample/repository",
        description: "This is a hardcoded description for the room.",
      };

      (getSession as jest.Mock).mockResolvedValue(null);

      const req = {
        json: jest.fn().mockResolvedValue(mockRoomData),
      } as unknown as Request;

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain("You have to sign in first");
    });

    test("should handle errors when creating a room", async () => {
      const mockRoomData = {
        userId: "1",
        name: "Sample Room",
        tags: "Tag1, Tag2, Tag3",
        githubRepo: "https://github.com/sample/repository",
        description: "This is a hardcoded description for the room.",
      };

      (getSession as jest.Mock).mockResolvedValue({ user: { id: "1" } });

      mockDbInsert.mockImplementation(() => {
        throw new Error("Database error");
      });

      const req = {
        json: jest.fn().mockResolvedValue(mockRoomData),
      } as unknown as Request;

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain("Error creating room.");
    });
  });
});
