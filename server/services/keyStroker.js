/* command:
{
  keys: string;
  modifiers: string; //a=alt, c=ctrl, s=shift
}
 */
function keyStroker(command) {
  let keyStroke = "";

  if (command.modifiers) {
    if (command.modifiers.indexOf("a") > -1) keyStroke += "!";
    if (command.modifiers.indexOf("c") > -1) keyStroke += "^^"; // used to do .replace("^", "^^")
    if (command.modifiers.indexOf("s") > -1) keyStroke += "+";
    if (command.modifiers.indexOf("w") > -1) keyStroke += "#";
  }

  keyStroke += command.keys;

  return `"${keyStroke}"`;
}

module.exports = keyStroker;
