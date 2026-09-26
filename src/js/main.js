// 평점은 1부터 5까지의 정수만 허용합니다.
function isValidRating(value) {
  return /^[1-5]$/.test(value);
}

const ratingForm = document.querySelector('.star-form');


if (ratingForm) {
  const error = document.querySelector('#error');
  const fieldSet = ratingForm.querySelector('fieldset[aria-describedby="error"]');
  
  ratingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedRating = ratingForm.querySelector(
      'input[name="rating"]:checked',
    );

    if (!selectedRating || !isValidRating(selectedRating.value)) {
      error.textContent = 'Please select a rating from 1 to 5.';
      fieldSet.setAttribute('aria-invalid', true);
      return;
    }

    // 페이지가 바뀌어도 점수를 읽을 수 있도록 주소에 담아 전달합니다.
    window.location.href = `./thanks.html?rating=${selectedRating.value}`;
  });

  ratingForm.addEventListener('change', function () {
    error.textContent = '';
    fieldSet.removeAttribute('aria-invalid');
  });
}

const userRating = document.querySelector('.user-rating');

if (userRating) {
  const rating = new URLSearchParams(window.location.search).get('rating');

  if (isValidRating(rating)) {
    userRating.textContent = 'You selected ' + rating + ' out of 5';
  } else {
    // 점수 없이 감사 페이지에 접근하면 선택 화면으로 돌아갑니다.
    window.location.replace('./index.html');
  }
}
