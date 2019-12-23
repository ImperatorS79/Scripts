const LocalInstallerScript = include("engines.wine.quick_script.local_installer_script");

const WineShortcut = include("engines.wine.shortcuts.wine");

const Corefonts = include("engines.wine.verbs.corefonts");
const DotNet20 = include("engines.wine.verbs.dotnet20");
const MsXML6 = include("engines.wine.verbs.msxml6");
const Riched20 = include("engines.wine.verbs.riched20");
const GDIplusWinXP = include("engines.wine.verbs.gdiplus_winxp");

const OverrideDLL = include("engines.wine.plugins.override_dll");

new LocalInstallerScript()
    .name("Microsoft Office 2010")
    .editor("Microsoft")
    .author("ImperatorS79")
    .category("Office")
    // exe set with WineShorcut
    .preInstall(function (wine) {
        new Corefonts(wine).go();
        new DotNet20(wine).go();
        new MsXML6(wine).go();
        new Riched20(wine).go();
        new GDIplusWinXP(wine).go();
    ))
    .postInstall(function (wine) {
        new OverrideDLL(wine).withMode("native, builtin", ["riched20"]).go();

        new WineShortcut()
            .name("Microsoft Word 2010")
            .prefix("Microsoft Office 2010")
            .search("WINWORD.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft Excel 2010")
            .prefix("Microsoft Office 2010")
            .search("EXCEL.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft PowerPoint 2010")
            .prefix("Microsoft Office 2010")
            .search("POWERPNT.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft OneNote 2010")
            .prefix("Microsoft Office 2010")
            .search("ONENOTE.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();

        new WineShortcut()
            .name("Microsoft Outlook 2010")
            .prefix("Microsoft Office 2010")
            .search("OUTLOOK.EXE")
            .miniature(["Office", "Microsoft Office 2010"])
            .create();
    });
