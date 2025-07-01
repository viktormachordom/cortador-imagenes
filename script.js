
function splitImage() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert("Por favor, sube una imagen.");

  const reader = new FileReader();
  const img = new Image();

  reader.onload = function (e) {
    img.src = e.target.result;
  };

  img.onload = function () {
    const numParts = parseInt(document.getElementById('numParts').value);
    const direction = document.getElementById('direction').value;
    const customWidth = parseInt(document.getElementById('width').value);
    const customHeight = parseInt(document.getElementById('height').value);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    let partWidth = customWidth || (direction === 'vertical' ? img.width / numParts : img.width);
    let partHeight = customHeight || (direction === 'horizontal' ? img.height / numParts : img.height);

    for (let i = 0; i < numParts; i++) {
      canvas.width = partWidth;
      canvas.height = partHeight;

      const sx = direction === 'vertical' ? i * partWidth : 0;
      const sy = direction === 'horizontal' ? i * partHeight : 0;

      ctx.clearRect(0, 0, partWidth, partHeight);
      ctx.drawImage(img, sx, sy, partWidth, partHeight, 0, 0, partWidth, partHeight);

      const croppedImage = new Image();
      croppedImage.src = canvas.toDataURL();
      croppedImage.style.maxWidth = "100%";
      resultDiv.appendChild(croppedImage);

      const link = document.createElement('a');
      link.href = croppedImage.src;
      link.download = `parte_${i + 1}.png`;
      link.textContent = `Descargar imagen ${i + 1}`;
      resultDiv.appendChild(document.createElement('br'));
      resultDiv.appendChild(link);
      resultDiv.appendChild(document.createElement('br'));
    }
  };

  reader.readAsDataURL(file);
}
