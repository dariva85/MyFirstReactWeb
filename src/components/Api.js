import axios from "axios";

export const getPersonsOnListByPage = async (page) => {
  const results = await axios("https://api.fbi.gov/wanted/v1/list", {
    params: { page: page },
  });

  return results;
};

export const getPerson = async (PersonId) => {
  const results = await axios("https://api.fbi.gov/wanted/v1/list", {
    params: { title: PersonId },
  });
  return results.data.items[0];
};
