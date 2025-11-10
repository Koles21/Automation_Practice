import test, { expect } from "@playwright/test";
import {
  ApiContext,
  createApiContext,
} from "../../../api/context/baseApiContext";
import { API_ENDPOINTS } from "../../../api/constants/endpoints";

test.describe("Users API", () => {
  let apiContext: ApiContext;

  test.beforeAll(async () => {
    try {
      apiContext = await createApiContext(process.env.API_URL || "test"); //fallback to 'test' if env variable is not set
    } catch (error) {
      console.error("Failed to initialize test suite:", error);
      throw error;
    }
  });

  test("should retrieve list of available users and log users with odd IDs", async ({
    request,
  }) => {
    const response = await request.get(
      `${apiContext.baseURL}${API_ENDPOINTS.USERS}`,
      {
        headers: { "x-api-key": "reqres-free-v1" },
      }
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const users = responseBody.data || [];

    const oddIdUsers = users.filter((user: any) => user.id % 2 !== 0); //ovde moram da vidim da ispisem i usera sa 1

    console.log("Users with odd IDs:");
    for (const user of oddIdUsers) {
      console.log(
        `ID: ${user.id}, Name: ${user.first_name} ${user.last_name}, Email: ${user.email}`
      );
    }
  });

  test("should create new user", async ({ request }) => {
    const data = {
      username: "eve.holt@reqres.in",
      email: "eve.holt@reqres.in",
      password: "string",
    }; //this can be parametrized and put in separate file
    const response = await request.post(
      `${apiContext.baseURL}${API_ENDPOINTS.REGISTER}`,
      {
        headers: { "x-api-key": "reqres-free-v1" },
        data: data,
      }
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    // Response body is not giving back created date, so we will not validate it here
    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("token");
  });

  test("should update existing user", async ({ request }) => {
    const userId = "4";
    const data = { username: "test", email: "test", password: "test" };
    const response = await request.put(
      `${apiContext.baseURL}${API_ENDPOINTS.UPDATE_USER(userId)}`,
      {
        headers: { "x-api-key": "reqres-free-v1" },
        data: data,
      }
    );
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("updatedAt");
    expect(responseBody.username).toBe(data.username);
    expect(responseBody.email).toBe(data.email);
    expect(responseBody.password).toBe(data.password);
  });

  const delays = [0, 3];

  delays.forEach((delay) => {
    test(`Get users with delay=${delay} should respond in <= 1s`, async ({
      request,
    }) => {
      const startTime = Date.now();
      const response = await request.get(
        `${apiContext.baseURL}${API_ENDPOINTS.USERS}?delay=${delay}`,
        {
          headers: { "x-api-key": "reqres-free-v1" },
        }
      );

      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000;

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);

      console.log(`Delay=${delay} Response Time: ${responseTime} seconds`);
      expect(responseTime).toBeLessThanOrEqual(delay + 1);
    });
  });

  test("should not login without password", async ({ request }) => {
    const data = {
      username: "eve.holt@reqres.in",
      email: "eve.holt@reqres.in",
    };
    const response = await request.post(
      `${apiContext.baseURL}${API_ENDPOINTS.LOGIN}`,
      {
        headers: { "x-api-key": "reqres-free-v1" },
        data: data,
      }
    );
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Missing password");
  });
});
