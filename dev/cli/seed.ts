import { UserRepository } from "../../server/database/repositories/user-repository";

(async () => {
  const userRepository = new UserRepository();

  for (let i = 0; i < 100; i++) {
    await userRepository.create({
      email: `test_${i}@test.com`,
      name: `Test User #${i}`,
      address: `${i} Washington Ave`,
    });
  }
})();
