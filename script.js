
document.getElementById("cutButton").addEventListener("click", function () {
  const input = document.getElementById("imageInput");
  const parts = parseInt(document.getElementById("parts").value);
  const direction = document.getElementById("direction").value;
  const widthInput = document.getElementById("width").value;
  const heightInput = document.getElementById("height").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const partSize = direction === "vertical"
        ? img.width / parts
        : img.height / parts;

      for (let i = 0; i < parts; i++) {
        let sliceCanvas = document.createElement("canvas");
        let sliceCtx = sliceCanvas.getContext("2d");

        if (direction === "vertical") {
          sliceCanvas.width = widthInput ? parseInt(widthInput) : partSize;
          sliceCanvas.height = heightInput ? parseInt(heightInput) : img.height;
          sliceCtx.drawImage(
            img,
            i * partSize, 0,
            partSize, img.height,
            0, 0,
            sliceCanvas.width, sliceCanvas.height
          );
        } else {
          sliceCanvas.width = widthInput ? parseInt(widthInput) : img.width;
          sliceCanvas.height = heightInput ? parseInt(heightInput) : partSize;
          sliceCtx.drawImage(
            img,
            0, i * partSize,
            img.width, partSize,
            0, 0,
            sliceCanvas.width, sliceCanvas.height
          );
        }

        const previewImg = new Image();
        previewImg.src = sliceCanvas.toDataURL();
        previewImg.style.maxWidth = "100%";
        resultDiv.appendChild(previewImg);

        const downloadBtn = document.createElement("a");
        downloadBtn.href = sliceCanvas.toDataURL();
        downloadBtn.download = "fragmento_" + (i + 1) + ".png";
        downloadBtn.textContent = "Descargar fragmento " + (i + 1);
        downloadBtn.style.display = "block";
        downloadBtn.style.marginBottom = "10px";
        resultDiv.appendChild(downloadBtn);
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
