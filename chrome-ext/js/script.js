function highlightCharacters(key, color) {
  const textNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    // Filter out text nodes that are children of <style> and <textarea> elements
    (node) =>
      node.parentElement.tagName !== "STYLE" &&
      node.parentElement.tagName !== "TEXTAREA"
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
    false,
  );
  let node;

  while ((node = textNodes.nextNode())) {
    const text = node.nodeValue;
    const regex = new RegExp(key, "gi");
    const newText = text.replace(
      regex,
      '<span style="color:' + color + ';">$&</span>',
    );
    if (newText !== text) {
      const span = document.createElement("span");
      span.innerHTML = newText;
      textNodes.nextNode(); //patchy way to get to skip it.
      node.parentNode.replaceChild(span, node);
      // something wrong happens here when it is found. replacing the child makes the textnodes die
    }
  }
}

// Inject function into the page
highlightCharacters("b", "green");
highlightCharacters("d", "red");
highlightCharacters("p", "blue");
