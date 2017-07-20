import fetch from 'utils/fetch';

export function getMusicById(music_id) {
  const data = {
    
  };
  return fetch({
    url: '/login/loginbyemail',
    method: 'post',
    data
  });
}

