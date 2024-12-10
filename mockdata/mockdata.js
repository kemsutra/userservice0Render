const { faker } = require("@faker-js/faker");

const languages = ["en", "pr", "es"];
const mockData = [];

languages.forEach((lang) => {
  console.log(`Generating records for language: ${lang}`);
  // Generate 5 records per language
  for (let i = 0; i < 5; i++) {
    const learningId = faker.number.int(); // Generate a random learning ID for each record
    const learning = {
      id: learningId,
      id_language: lang,
      translations: {
        title: faker.lorem.words(5),
        description: faker.lorem.paragraph(),
        goals: JSON.stringify([
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ]),
      },
      contents: {
        text: faker.lorem.paragraphs(2),
        sections: [
          {
            section_text: faker.lorem.sentence(),
            lectures: [
              {
                text: faker.lorem.sentence(),
                href: faker.internet.url(),
              },
              {
                text: faker.lorem.sentence(),
                href: faker.internet.url(),
              },
            ],
          },
          {
            section_text: faker.lorem.sentence(),
            lectures: [
              {
                text: faker.lorem.sentence(),
                href: faker.internet.url(),
              },
            ],
          },
        ],
      },
    };

    mockData.push(learning); // Add each generated record to the mockData array
  }
});

console.log(`Generated ${mockData.length} records`);

module.exports = mockData;
