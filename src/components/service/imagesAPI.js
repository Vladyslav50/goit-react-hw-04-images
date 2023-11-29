import axios from 'axios';

const API_KEY = '39901294-238ac08c798d7faa0a18a2d03';

export const getImages = async (keyWord, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log('data =>>', data)
  return data;
};
