const { faker } = require("@faker-js/faker");

const languages = ["en", "pr", "es"];
const mockData = [];

languages.forEach((lang) => {
  const learningId = faker.datatype.number();
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

  mockData.push(learning);
});

module.exports = mockData;
