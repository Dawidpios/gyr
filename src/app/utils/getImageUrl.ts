
const getImageUrl = (url : string | undefined) => {
  if (!url) {
    console.log("Brak obrazu, używam placeholdera")
    return "/placeholder.svg";
  }
  
  // Usuń cudzysłowy z początku i końca jeśli istnieją
  let cleanUrl = url.trim();
  if ((cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) || 
      (cleanUrl.startsWith("'") && cleanUrl.endsWith("'"))) {
    cleanUrl = cleanUrl.substring(1, cleanUrl.length - 1);
  }
  
  console.log("Oczyszczony URL:", cleanUrl);
  
  try {
    // Sprawdzamy, czy URL jest poprawny
    console.log("Próbuję utworzyć URL z:", cleanUrl)
    const url = new URL(cleanUrl);
    console.log("URL poprawny:", url.toString())
    return cleanUrl;
  } catch (e) {
    console.error("Niepoprawny URL obrazu:", cleanUrl)
    console.error("Szczegóły błędu:", e)
    
    // Spróbujmy naprawić URL, usuwając spacje i dodając protokół jeśli brakuje
    let fixedUrl = cleanUrl;
    if (!fixedUrl.startsWith('http://') && !fixedUrl.startsWith('https://')) {
      fixedUrl = 'https://' + fixedUrl;
    }
    
    try {
      new URL(fixedUrl);
      console.log("Naprawiony URL:", fixedUrl);
      return fixedUrl;
    } catch {
      console.log("Nie udało się naprawić URL, używam placeholdera");
      return "/placeholder.svg";
    }
  }
};


export default getImageUrl