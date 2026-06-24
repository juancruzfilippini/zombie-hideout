declare module "gamedig" {
  export const GameDig: {
    query(input: unknown): Promise<unknown>;
  };
}
