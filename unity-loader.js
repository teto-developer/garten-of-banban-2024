// unity-loader.js
(function() {
    // Unityコンテナ
    const unityContainerId = "unityContainer";

    // Unityビルド用パス
    const buildFolder = "Build";
    const jsonFile = "YourGame.json"; // Unityビルドに合わせて変更

    // UnityLoader.js が読み込まれているか確認
    if (typeof UnityLoader === "undefined") {
        console.error("UnityLoader.js が読み込まれていません！");
        return;
    }

    // Unity WebGL インスタンス生成
    const container = document.getElementById(unityContainerId);
    if (!container) {
        console.error(`#${unityContainerId} が見つかりません`);
        return;
    }

    const unityInstance = UnityLoader.instantiate(
        unityContainerId,
        `${buildFolder}/${jsonFile}`,
        {
            onProgress: (instance, progress) => {
                console.log(`Unity Loading: ${(progress*100).toFixed(2)}%`);
            },
            Module: {
                onRuntimeInitialized: () => {
                    console.log("Unity Runtime Initialized!");
                }
            }
        }
    );

    // ウィンドウサイズに合わせてリサイズ
    window.addEventListener("resize", () => {
        const canvas = container.querySelector("canvas");
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
})();
