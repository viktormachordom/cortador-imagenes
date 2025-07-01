document.getElementById('imageInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const parts = parseInt(document.getElementById('parts').value);
  const direction = document.getElementById('direction').value;
  const customWidth = parseInt(document.getElementById('customWidth').value);
  const customHeight = parseInt(document.getElementById('customHeight').value);
  const result = document.getElementById('result');
  result.innerHTML = '';

  if (!file || isNaN(parts) || parts < 1) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let width = img.width;
      let height = img.height;

      let partWidth = direction === 'vertical' ? width : (customWidth || Math.floor(width / parts));
      let partHeight = direction === 'horizontal' ? height : (customHeight || Math.floor(height / parts));

      for (let i = 0; i < parts; i++) {
        canvas.width = partWidth;
        canvas.height = partHeight;

        ctx.clearRect(0, 0, partWidth, partHeight);

        let sx = direction === 'vertical' ? 0 : i * partWidth;
        let sy = direction === 'horizontal' ? 0 : i * partHeight;

        ctx.drawImage(img, sx, sy, partWidth, partHeight, 0, 0, partWidth, partHeight);

        const partImg = document.createElement('img');
        partImg.src = canvas.toDataURL();
        result.appendChild(partImg);
      }
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});
