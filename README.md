# 簡介
本專案為重慶時時彩的前端開發架構，採用VueJS與jQuery為主的開發函式庫。
# 開發環境
## 初次設定
### Git
透過命令列確認系統中是否有安裝git
```
    git --version
```

如未安裝可透過下列指令安裝
```
    https://git-scm.com/downloads
```
### NPM
透過命令列確認系統中是否有安裝npm
```
    npm -v
```
如未安裝可透過以下網址下載並安裝NodeJS(請下載LTS版本)

    https://nodejs.org/en/


NodeJS是基於Chrome V8引擎的Javascript運行環境，採用Event-Driven、Non-blocking IO的實作概念且包含套件管理系統 NPM 的軟體。本文撰寫時，NodeJS版本為 v8.9.3、NPM版本為 v5.6.0。

### 安裝套件

當您下載好專案並完成初次設定後，利用NPM指令再行安裝

```
    npm install
```

NPM 系統會依照package.json檔案中的設定將開發與部署所需函式一次安裝到位。

## 目錄結構
現有專案目錄結構表列如下：
```
    dev
        style
        view
        script
        images
    design
        ....
    dist
        css
        img
        js
        font(if necessary)
    bower.json
    package.json
    .gitignore
    .bowerrc
    README.md
    gulpfile.js
```
## 結構說明

- dev 前端團隊開發主目錄 
    - style 樣式表目錄，亦為團隊產出的css樣式表
    - view 頁面目錄，亦為團隊產出的html頁面
    - script javascript目錄，為前端團隊開發核心目錄
    - images 專案用圖目錄
- design UI設計團隊主目錄
    - (需design團隊協助補述)
    - ...族繁不及備載...
- dist 前端團隊產出目錄，亦為最後部署產品的內容物
    - css css檔放置處
    - img 圖片檔放置處
    - js javascript檔放置處
    - font 文字檔放置處(if necessary)
- bower.json npm系統用於作套件依賴管理的json檔
- package.json npm系統用於作套件依賴管理的json檔
- .gitignore git-commit至local repository所用之忽略清單
- .bowerrc bower套件下載的定義檔
- README.md
- gulpfile.js 

## Gulp執行說明

開啟瀏覽器
```
    gulp start
```

以開發者模式開啟瀏覽器
```
    gulp start:dev
```

啟用程式碼監看模式
```
    gulp watch
```

建置dev目錄所有程式碼並部署至對應目錄中
```
    gulp build
```

清除dist目錄下所有目錄及檔案
```
    gulp clean
```





