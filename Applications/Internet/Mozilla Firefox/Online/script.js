include(["Engines", "Wine", "QuickScript", "OnlineInstallerScript"]);
include(["Engines", "Wine", "Engine", "Object"]);
include(["Engines", "Wine", "Verbs", "vcrun2015"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

new OnlineInstallerScript()
    .name("Mozilla Firefox")
    .editor("The Mozilla Fundation")
    .author("ImperatorS79")
    .wineVersion(LATEST_STAGING_VERSION)
    .wineDistribution("staging")
    .category("Internet")
    .executable("firefox.exe")
    .url("http://ftp.mozilla.org/pub/firefox/releases/54.0/win32/en-GB/Firefox%20Setup%2054.0.exe")
    .preInstall(function(wine, wizard) {
        wine.vcrun2015();
    })
    .postInstall(function(wine, wizard) {
        new Downloader()
            .wizard(wizard)
            .url("https://fpdownload.macromedia.com/pub/flashplayer/latest/help/install_flash_player.exe")
            .to(wine.prefixDirectory + "drive_c/users/install_flash_player.exe")
	    .get();
			
	wine.runInsidePrefix("/users/install_flash_player.exe");
    })
    .go();
