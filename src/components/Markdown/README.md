### Markdown

```jsx
const text = require("raw-loader!../../fixtures/markdown.md");

<Markdown text={text} emojiSize={40} inline />
```

### Emoji only

```jsx
<Markdown text="😀🐱" />
```

### Inline mode

```jsx
<div style={{
  lineHeight: '70px'
}}>
  <Markdown
    text=":cop: *Hello* :dog:"
    inline
    emojiSize={30}
  />
</div>
```
