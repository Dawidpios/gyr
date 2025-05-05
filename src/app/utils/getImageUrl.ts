
const getImageUrl = (url : string | undefined) => {
  if (!url) {
    console.log("Brak obrazu, używam placeholdera")
    return "/placeholder.svg";
  }
  
  let cleanUrl = url.trim();
  if ((cleanUrl.startsWith('"') && cleanUrl.endsWith('"')) || 
      (cleanUrl.startsWith("'") && cleanUrl.endsWith("'"))) {
    cleanUrl = cleanUrl.substring(1, cleanUrl.length - 1);
  }
  
  
  try {
    const url = new URL(cleanUrl);
    console.log("URL poprawny:", url.toString())
    return cleanUrl;
  } catch (e) {
    console.error("Szczegóły błędu:", e)
    
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