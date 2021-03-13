//Unit test for util functions
const { generateText } = require('./util');

//Testing partitions
test('should output name and age', () => {
  const text = generateText('Thiago', 33);
  expect(text).toBe('Thiago (33 years old)');
  const text2 = generateText('Raimunda', 56);
  expect(text2).toBe('Raimunda (56 years old)');
});

//Testing null inputs
test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
});

//Testing empty input
test('should output data-less text', () => {
  const text = generateText();
  expect(text).toBe('undefined (undefined years old)');
});
