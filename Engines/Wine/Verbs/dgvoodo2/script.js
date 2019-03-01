include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("engines.wine.verbs.dxvk");


/**
* Verb to install dgvoodoo2
* see: http://www.dege.freeweb.hu/dgVoodoo2/dgVoodoo2.html
* @param {String} glideD3d glide to install glide, d3d to install d3d1-8, nothing to install both
* @returns {Wine} Wine object
*/
Wine.prototype.dgvoodoo2 = function (glideD3d) {
    dgvoodoo2Version = "2_55_4";
	
	//Use WIP for D3D9 ?
	
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://www.dege.freeweb.hu/dgVoodoo2/dgVoodoo" + dgvoodoo2Version + ".zip")
        .name("dgVoodoo" + dgvoodoo2Version + ".zip")
        .get();

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/TMP/")
        .extract();
        
    var message = "Please select the .exe of the programs";
    var userFilePath = setupWizard.browse(message, this.prefixDirectory(), ["exe"]);

    userFilePath.slice(0,userFilePath.lastIndexOf('/'))
    
    print(userFilePath);
    
    //Manipulate userFilePath to delete the last part
    
    if (glideD3D = "glide") {
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide3x.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide2x.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide.dll", userFilePath);
    } else if (glideD3D = "d3d"){
        cp(this.prefixDirectory() + "/TMP/MS/DDraw.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/MS/D3DImm.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/MS/D3D8.dll", userFilePath);
    } else {
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide3x.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide2x.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/MS/DDraw.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/MS/D3DImm.dll", userFilePath);
        cp(this.prefixDirectory() + "/TMP/MS/D3D8.dll", userFilePath);
    }

    remove(this.prefixDirectory() + "/TMP/");
    
    this.DXVK();

    return this;
}

/**
 * Verb to install dgvoodoo2
*/
var verbImplementation = {
    install: function (container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "dgvoodoo2", java.util.Optional.empty());
        var options = ["glide", "d3d", "both"];
        var selectedOption = wizard.menu(tr("Please select the dll's to install."), options, "glide");
        wine.wizard(wizard);
        // install selected version
        wine.dgvoodoo2(selectedOption);
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);

