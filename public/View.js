export class View {
  constructor() {
    this.showNavbar();
    this.showLoginCard();
  }

  showNavbar() {
    // Create basic nav element
    const nav = document.createElement('nav');

    // Create logo and add to nav
    const logo = document.createElement('img');
    logo.className = 'nav-logo';
    logo.src = './assets/svg/logo_dark.svg';

    // Create nav links
    const navLinks = document.createElement('ul');

    const signoutNavLink = document.createElement('li');

    const signoutLink = document.createElement('a');
    signoutLink.id = 'logoutButton';
    signoutLink.innerText = 'Sign out';

    signoutLink.hidden = true;

    signoutNavLink.append(signoutLink);
    navLinks.append(signoutNavLink);

    nav.append(logo, navLinks);

    this.nav = nav;

    document.body.prepend(nav);
  }

  showLoginCard() {
    const loginCard = document.createElement('div');
    loginCard.className = 'card dp1 centered';
    
    // Add title
    const cardTitle = document.createElement('h2');
    cardTitle.innerText = 'Log in to Mimicry';

    // Add error message
    const errorMessageWrapper = document.createElement('div');
    errorMessageWrapper.className = 'error-wrapper';
    errorMessageWrapper.style.visibility = 'hidden';

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error';
    errorMessage.innerText = 'Error';

    errorMessageWrapper.append(errorMessage);

    // Add input fields
    const emailField = this._makeField('text', 'Email', 'emailField');
    const passwordField = this._makeField('password', 'Password', 'passwordField');

    // Add buttons
    const loginButton = document.createElement('button');
    loginButton.id = 'loginButton';
    loginButton.className = 'button primary';
    loginButton.innerText = 'Log in';
    loginButton.style.width = '100%';
    loginButton.style.marginTop = 1 + 'rem';

    const signupButton = document.createElement('button');
    signupButton.id = 'signupButton';
    signupButton.className = 'button secondary';
    signupButton.innerText = 'Sign up';
    signupButton.style.width = '100%';
    signupButton.style.marginTop = 0.8 + 'rem';

    // Bind enter key event to login button
    emailField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        loginButton.click();
      }
    });

    passwordField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        loginButton.click();
      }
    });

    // Add forgot password link
    const forgotPwdWrapper = document.createElement('div');
    forgotPwdWrapper.style.textAlign = 'center';
    forgotPwdWrapper.style.margin = '3rem auto -1rem auto';

    const forgotPwdText = document.createElement('a');
    forgotPwdText.href = '#';
    forgotPwdText.innerText = 'Forgot password?'

    forgotPwdWrapper.append(forgotPwdText);

    // Append all components to card
    loginCard.append(
      cardTitle, 
      errorMessageWrapper,
      emailField, 
      passwordField, 
      loginButton, 
      signupButton, 
      forgotPwdWrapper
    );

    this.loginCard = loginCard;

    document.body.append(loginCard);
  }

  showSignupCard() {
    const signupCard = document.createElement('div');
    signupCard.className = 'card dp1 centered';
    
    const cardTitle = document.createElement('h2');
    cardTitle.innerText = 'Sign up to Mimicry';

    // Add error message
    const errorMessageWrapper = document.createElement('div');
    errorMessageWrapper.className = 'error-wrapper';
    errorMessageWrapper.style.visibility = 'hidden';

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error';
    errorMessage.innerText = 'Error';

    errorMessageWrapper.append(errorMessage);

    const emailField = this._makeField('text', 'Email', 'emailField');
    const passwordField = this._makeField('password', 'Password', 'passwordField');
    const passwordConfirmField = this._makeField('password', 'Retype password', 'passwordConfirmField');

    const createAccountButton = document.createElement('button');
    createAccountButton.id = 'createAccountButton';
    createAccountButton.className = 'button primary';
    createAccountButton.innerText = 'Create account';
    createAccountButton.style.width = '100%';
    createAccountButton.style.marginTop = 1 + 'rem';

    const backButton = document.createElement('button');
    backButton.id = 'backToLoginButton';
    backButton.className = 'button secondary';
    backButton.innerText = 'Back';
    backButton.style.width = '100%';
    backButton.style.marginTop = 0.8 + 'rem';

    signupCard.append(
      cardTitle, 
      errorMessageWrapper,
      emailField, 
      passwordField, 
      passwordConfirmField, 
      createAccountButton, 
      backButton
    );

    this.signupCard = signupCard;

    document.body.append(signupCard);
  }

  showClozeCard(card) {
    // card = {fr: '{Tapez} moi sur votre clavier !', en: '{Type} me on your keyboard!'}

    const clozeCard = document.createElement('div');
    clozeCard.className = 'card cloze centered dp1';
    clozeCard.id = 'clozeCard';
    
    // Generate target phrase
    const targetPhrase = document.createElement('p');
    targetPhrase.className = 'targetPhrase';

    // Populate targetPhrase element
    for (let word of card.fr.split(' ')) {
      if (this._isBracketed(word)) {
        // Cloze word
        word = word.replace(/[\{\}]/g, '');
      }

      let span = document.createElement('span');
      span.innerText = word;
      targetPhrase.append(span);

      // Add space between words
      targetPhrase.insertAdjacentHTML('beforeend', ' ');
    }

    // Add nativePhrase and buttons to bottom wrapper
    const bottomWrapper = document.createElement('div');

    // Apply basic styles to wrapper
    bottomWrapper.style.display = 'flex';
    bottomWrapper.style.justifyContent = 'space-between';
    bottomWrapper.style.alignItems = 'flex-end';

    const nativePhrase = document.createElement('p');
    nativePhrase.className = 'nativePhrase';

    // Populate nativePhrase element
    for (let word of card.en.split(' ')) {
      if (this._isBracketed(word)) {
        // Remove brackets
        word = word.replace(/[\{\}]/g, '');

        // Target word
        let span = document.createElement('span');
        span.className = 'targetWord';
        span.innerText = word;

        nativePhrase.append(span)

        // Add space before and after targetWord
        span.insertAdjacentHTML('afterend', ' ');
      } else {
        nativePhrase.append(word + ' ');
      }
    }

    // Generate buttons
    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    // Micrphone button
    const microphoneButton = document.createElement('button');
    microphoneButton.id = 'microphoneButton';
    microphoneButton.className = 'button primary icon';

    const microphoneIcon = document.createElement('img');
    microphoneIcon.className = 'centered';
    microphoneIcon.src = './assets/svg/microphone_white.svg';
    microphoneIcon.style.width = 14 + 'px';
    microphoneButton.append(microphoneIcon);

    // Speak button
    const speakButton = document.createElement('button');
    speakButton.id = 'speakButton';
    speakButton.className = 'button primary icon';

    const speakIcon = document.createElement('img');
    speakIcon.className = 'centered';
    speakIcon.src = './assets/svg/speaker_white.svg';
    speakIcon.style.width = 20 + 'px';
    speakButton.append(speakIcon);

    buttons.append(microphoneButton, speakButton);

    bottomWrapper.append(nativePhrase, buttons);

    clozeCard.append(targetPhrase, bottomWrapper);

    this.clozeCard = clozeCard;

    document.body.append(clozeCard);
  }

  _highlightWords(correctIdxs) {
    // Highlights correct words on cloze card
    const targetPhrase = document.querySelector('.targetPhrase');
    const targetSpans = targetPhrase.children;

    // Remove previous styling
    targetPhrase.classList.remove('complete');
    for (let span of targetSpans) {
      span.classList.remove('correct');
    }

    for (let i of correctIdxs) {
      const span = targetSpans[i];
      span.classList.add('correct');
    }
  }

  _markCorrect() {
    document.querySelector('.targetPhrase').classList.add('complete');
  }

  _isBracketed(string) {
    // Returns true if {string} is bracketed
    // const pattern = /(\{[^\]]*\})/; // g -- global flag
    const pattern = /[\{\}]/;
    return string.match(pattern);
  }

  _bindSignupButton(handler) {
    this.loginCard.addEventListener('click', (event) => {
      if (event.target.id !== 'signupButton') return;
      event.target.blur();
      handler();
    });
  }

  _bindLoginButton(handler) {
    this.loginCard.addEventListener('click', (event) => {
      if (event.target.id !== 'loginButton') return;

      event.target.blur();

      let email = document.getElementById('emailField').value;
      let password = document.getElementById('passwordField').value;

      handler(email, password)
    });
  }

  _bindBackButton(handler) {
    this.signupCard.addEventListener('click', (event) => {
      if (event.target.id !== 'backToLoginButton') return;
      event.target.blur();
      handler();
    });
  }

  _bindCreateAccountButton(handler) {
    this.signupCard.addEventListener('click', (event) => {
      if (event.target.id !== 'createAccountButton') return;

      event.target.blur();

      let email = document.getElementById('emailField').value;
      let password = document.getElementById('passwordField').value;
      let passwordConfirm = document.getElementById('passwordConfirmField').value;

      // Stop sign-up process if passwords don't match
      if (password !== passwordConfirm) {
        let errorMessage = 'The passwords do not match.'
        this.raiseSignupError(errorMessage, false, true);
        return;
      }

      handler(email, password);
    });
  }

  _bindLogoutButton(handler) {
    this.nav.addEventListener('click', (event) => {
      if (event.target.id !== 'logoutButton') return;

      event.target.blur();

      handler();
    });
  }

  _bindSpeakButton(handler) {
    this.clozeCard.addEventListener('click', (event) => {
      if (event.target.id !== 'speakButton' && 
          !event.target.matches('#speakButton img')) return;
      
      event.target.closest('.button').blur();

      const phrase = document.querySelector('.targetPhrase').innerText.trim();
      handler(phrase)
    });
  }

  raiseLoginError(message, highlightEmailField, highlightPasswordField) {
    const emailField = document.getElementById('emailField');
    const passwordField = document.getElementById('passwordField');

    // Reset form styles
    emailField.parentElement.classList.remove('field-failure');
    passwordField.parentElement.classList.remove('field-failure');

    // Display error message
    this.loginCard.querySelector('.error-wrapper').style.visibility = 'visible';
    this.loginCard.querySelector('.error').innerText = message;

    // Change specified input fields to error state if specified
    if (highlightEmailField) {
      emailField.parentElement.classList.add('field-failure');
    }
    if (highlightPasswordField) {
      passwordField.parentElement.classList.add('field-failure');
    }
  }

  raiseSignupError(message, highlightEmailField, highlightPasswordField) {
    const emailField = document.getElementById('emailField');
    const passwordField = document.getElementById('passwordField');
    const passwordConfirmField = document.getElementById('passwordConfirmField');

    // Reset form styles
    emailField.parentElement.classList.remove('field-failure');
    passwordField.parentElement.classList.remove('field-failure');
    passwordConfirmField.parentElement.classList.remove('field-failure');

    // Display error message
    document.querySelector('.error-wrapper').style.visibility = 'visible';
    document.querySelector('.error').innerText = message;

    // Change specified input fields to error state if specified
    if (highlightEmailField) {
      emailField.parentElement.classList.add('field-failure');
    }
    if (highlightPasswordField) {
      passwordField.parentElement.classList.add('field-failure');
      passwordConfirmField.parentElement.classList.add('field-failure');
    }
  }

  _makeField(type = 'text', labelText = '', id = '') {
    // Helper function to make input field
    // TODO: Object argument instead

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = ' ';
    input.autocomplete = 'off'; // chrome autocomplete styling is grotesque, temp fix

    const label = document.createElement('label');
    label.innerText = labelText;

    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'field-group';
    fieldGroup.append(input, label);

    return fieldGroup;
  }

  _clearWindow() {
    // Clear everything but the nav
    let nav  = document.querySelector('nav');
    while (nav.nextSibling) {
      nav.nextSibling.remove();
    }
  }
}