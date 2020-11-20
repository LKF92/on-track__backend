const { expect } = require("chai");

expect(true).to.be.true;

function titleCase(string) {
  return string
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

expect(titleCase("the great mouse detective")).to.be.a("string");
expect(titleCase("a")).to.be.equal("A");
expect(titleCase("vertigo")).to.be.equal("Vertigo");
expect(titleCase("the great mouse detective")).to.be.equal("The Great Mouse Detective");

// Test suite
describe("Mocha", () => {
  // Test spec (unit test)
  it("should run our test using npm", () => {
    expect(true).to.be.ok;
  });
});
