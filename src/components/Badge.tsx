import { FC } from "react";

export const Badge: FC<{ name: string }> = ({ name }) => {
  return (
    <>
      {name == "moderator" ? (
        <img
          src="https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1"
          alt="mod-badge"
        />
      ) : name == "vip" ? (
        <img
          src="https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/1"
          alt="vip-badge"
        />
      ) : name == "premium" ? (
        <img
          src="https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/1"
          alt="premium-badge"
        />
      ) : null}
    </>
  );
};
