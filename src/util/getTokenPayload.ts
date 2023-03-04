import jwt_decode from "jwt-decode";

interface ItokenPayload {
  userId: string;
}

export default function getTokenPayload(accessToken: string) {
  const { userId }: ItokenPayload = jwt_decode(accessToken);
  return { accessToken, userId };
}
