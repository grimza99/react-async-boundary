import { execSync } from "child_process";

const type = process.argv[2] || "patch";

try {
  console.log(`Releasing new ${type} version...`);

  execSync(`npm version ${type}`, { stdio: "inherit" });

  execSync("git push origin main --tags", { stdio: "inherit" });

  const version = execSync("node -p \"require('./package.json').version\"")
    .toString()
    .trim();
  execSync(`gh release create v${version} --generate-notes`, {
    stdio: "inherit",
  });

  execSync("npm publish --access public", { stdio: "inherit" });

  console.log(`✅ Successfully released v${version}!`);
} catch (err) {
  console.error("❌ Release failed:", err.message);
  process.exit(1);
}
