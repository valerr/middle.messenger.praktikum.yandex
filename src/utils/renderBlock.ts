import Block from './Block';

const renderBlock = (block: Block, selector = "root") => {
    const domNode = document.querySelector(selector);
    domNode!.innerHTML = '';
    domNode!.appendChild(block.getContent());
}

export default renderBlock;