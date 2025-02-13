function camelize(str) {
  let strElements = str.split('-');
  
  strElements = strElements.map((str, index) =>
    index === 0 ? str : str.charAt(0).toUpperCase() + str.slice(1)
  );
  
  return strElements.join(''); 
}