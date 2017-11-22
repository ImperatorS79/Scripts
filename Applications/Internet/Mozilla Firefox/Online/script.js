include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

new OnlineInstallerScript()
    .name("Mozilla Firefox")
    .editor("The Mozilla Fundation")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .category("Internet")
    .executable("firefox.exe")
    .url("http://ftp.mozilla.org/pub/firefox/releases/56.0.2/win32/en-GB/Firefox%20Setup%2056.0.2.exe")
    .postInstall(function(wine, wizard) {
        new Downloader()
            .wizard(wizard)
            .url("https://fpdownload.macromedia.com/pub/flashplayer/latest/help/install_flash_player.exe")
            .to(wine.prefixDirectory + "drive_c/users/install_flash_player.exe")
	    .get();
			
	wine.runInsidePrefix("/users/install_flash_player.exe");
    })
    .go();
