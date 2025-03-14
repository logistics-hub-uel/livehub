/**
 * JWT Helper utility functions
 */

/**
 * Parse the payload from a JWT token.
 * @param {string} token - The JWT token to parse
 * @returns {object|null} The decoded payload or null if invalid
 */
export const parseJwtPayload = (token) => {
  try {
    // Check if token exists
    if (!token) return null;

    // Split the token into its parts
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Get the payload (second part)
    const payload = parts[1];

    // Base64Url decode and parse as JSON
    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return decodedPayload;
  } catch (error) {
    console.error("Error parsing JWT token:", error);
    return null;
  }
};

/**
 * Verify if a JWT token is expired.
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if token is expired or invalid, false otherwise
 */
export const isTokenExpired = (token) => {
  try {
    const payload = parseJwtPayload(token);
    if (!payload || !payload.exp) return true;

    // Check if the expiration time is in the past
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Get user information from JWT token.
 * @param {string} token - The JWT token
 * @returns {object|null} User info or null if invalid
 */
export const getUserInfoFromToken = (token) => {
  const payload = parseJwtPayload(token);
  if (!payload) return null;

  return {
    id: payload.sub || payload.id || payload.userId,
    email: payload.email,
    name: payload.name,
    roles: payload.roles || [],
    // Add other fields as needed based on your JWT structure
  };
};

/**
 * Get remaining valid time of token in seconds.
 * @param {string} token - The JWT token
 * @returns {number} Remaining seconds or 0 if expired/invalid
 */
export const getTokenRemainingTime = (token) => {
  try {
    const payload = parseJwtPayload(token);
    if (!payload || !payload.exp) return 0;

    const currentTime = Math.floor(Date.now() / 1000);
    const remaining = payload.exp - currentTime;

    return remaining > 0 ? remaining : 0;
  } catch (error) {
    return 0;
  }
};
