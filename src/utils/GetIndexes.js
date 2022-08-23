export const getIndexes = (string, char) =>{
  let indices = [];
  for(let i=0; i<string.length;i++) {
    if (string[i] === char) indices.push(i);
  } 
  return indices;
}