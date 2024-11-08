// import React, { useState } from 'react';
// import axios from 'axios';

// function DictionaryApp() {
//     const [englishWord, setEnglishWord] = useState('');
//     const [translation, setTranslation] = useState('');
//     const [error, setError] = useState('');

//     const handleTranslate = async () => {
//         try {
//             const response = await axios.get(`/api/Translation/${englishWord}`);
//             setTranslation(response.data);
//             setError('');
//         } catch (err) {
//             setError('Translation not found.');
//             setTranslation('');
//         }
//     };

//     return (
//         <div>
//             <h1>English to Hungarian Dictionary</h1>
//             <input
//                 type="text"
//                 value={englishWord}
//                 onChange={(e) => setEnglishWord(e.target.value)}
//                 placeholder="Enter English word"
//             />
//             <button onClick={handleTranslate}>Translate</button>
//             {translation && <p>Translation: {translation}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// }

// export default DictionaryApp;




import React, { useState } from 'react';
import axios from 'axios';

function DictionaryApp() {
  const [englishWord, setEnglishWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');

  const fetchTranslation = async () => {
    try {
      const response = await axios.get(`/api/translation/${encodeURIComponent(englishWord)}`);
      setTranslation(response.data.hungarianTranslation);
      setError('');  // Clear any previous error
    } catch (err) {
      setError(err.response?.data.message || 'Translation not found.');
      setTranslation('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTranslation();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
          placeholder="Enter English word"
        />
        <button type="submit">Translate</button>
      </form>
      {translation && <p>Hungarian Translation: {translation}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default DictionaryApp;

