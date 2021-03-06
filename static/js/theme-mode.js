function switchTheme() {
  const currentStyle = currentTheme();

  if (currentStyle == 'light') {
    setTheme('dark');
  }
  else {
    setTheme('light');
  }
}

function setTheme(style) {
  document.querySelectorAll('.isInitialToggle').forEach(elem => {
    elem.classList.remove('isInitialToggle');
  });
  document.documentElement.setAttribute('data-color-mode', style);
  // https://github.com/utterance/utterances/issues/549#issuecomment-907606127
  // 修改 utteranc 无法跟随主题切换模式
  if (document.querySelector('.utterances-frame')) {
    const theme = document.documentElement.getAttribute('data-color-mode') === 'dark' ? 'github-dark' : 'github-light'
    const message = {
      type: 'set-theme',
      theme: theme
    };
    const iframe = document.querySelector('.utterances-frame');
    iframe.contentWindow.postMessage(message, 'https://utteranc.es');
  }
  localStorage.setItem('data-color-mode', style);
}

function currentTheme() {
  const localStyle = localStorage.getItem('data-color-mode');
  const systemStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStyle || systemStyle;
}

(() => {
  setTheme(currentTheme());
})();