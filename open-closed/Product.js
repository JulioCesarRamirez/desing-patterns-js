const Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

const Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

const apple = new Product("apple", Color.green, Size.small);
const tree = new Product("tree", Color.green, Size.large);
const house = new Product("house", Color.blue, Size.large);

const products = [apple, tree, house];

let pf = new ProductFilter();
let bf = new BetterFilter();

console.log("Green products (old): ");

for (let p of pf.filterByColor(products, Color.green)) {
  console.log(` * ${p.name} is green`);
}

console.log("Green products (new): ");

for (let p of bf.filter(products, new ColorSpecification(Color.blue))) {
  console.log(` * ${p.name} is green`);
}

console.log("Large and Green products");

let spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);

for (let p of bf.filter(products, spec)) {
  console.log(` * ${p.name} is large and green`);
}
