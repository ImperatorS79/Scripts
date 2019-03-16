include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("engines.wine.verbs.dxvk");


/**
* Verb to install dgvoodoo2
* see: http://www.dege.freeweb.hu/dgVoodoo2/dgVoodoo2.html
* @param {String} glideD3d glide, d3d1-8 or d3d9
* @returns {Wine} Wine object
*/
Wine.prototype.dgvoodoo2 = function (glideD3d) {
    dgvoodoo2Version = "2_55_4_1";
    dgvoodoo2VersionBeta = "WIP58";
    	
	if (glideD3d = "d3d9"){
	    var setupFile = new Resource()
            .wizard(this.wizard())
            .url("http://www.dege.freeweb.hu/temp/dgVoodoo" + dgvoodoo2VersionBeta + ".zip")
            .name("dgVoodoo" + dgvoodoo2VersionBeta + ".zip")
            .get();
	}
	else{
	    var setupFile = new Resource()
            .wizard(this.wizard())
            .url("http://www.dege.freeweb.hu/dgVoodoo2/dgVoodoo" + dgvoodoo2Version + ".zip")
            .name("dgVoodoo" + dgvoodoo2Version + ".zip")
            .get();
	}

    new Extractor()
        .wizard(this.wizard())
        .archive(setupFile)
        .to(this.prefixDirectory() + "/TMP/")
        .extract();
        
    var message = "Please select the .exe of the programs";
    var userFilePath = this.wizard().browse(message, this.prefixDirectory(), ["exe"]);

    var pathDir = userFilePath.split('/');
    pathDir.pop();
    pathDir = pathDir.join('/');    
        
    if (glideD3D == "glide") {
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide3x.dll", pathDir + "/glide3x.dll");
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide2x.dll", pathDir + "/glide2x.dll");
        cp(this.prefixDirectory() + "/TMP/3Dfx/x86/Glide.dll", pathDir + "/glide.dll");
        
        this.overrideDLL()
            .set("builtin", ["glide3x", "glide2x", "glide"])
            .do();
    } else if (glideD3D == "d3d1-8"){
        cp(this.prefixDirectory() + "/TMP/MS/DDraw.dll", pathDir + "/ddraw.dll");
        cp(this.prefixDirectory() + "/TMP/MS/D3DImm.dll", pathDir + "/d3dimm.dll");
        cp(this.prefixDirectory() + "/TMP/MS/D3D8.dll", pathDir + "/d3d8.dll");
        
        this.overrideDLL()
            .set("builtin", ["ddraw", "d3dimm", "d3d8"])
            .do();
    } else if (glideD3D == "d3d9"){
        if (this.architecture() == "amd64") {
            cp(this.prefixDirectory() + "/TMP/MS/x64/D3D9.dll", pathDir + "/d3d9.dll");
        } else {
            cp(this.prefixDirectory() + "/TMP/MS/x86/D3D9.dll",  pathDir + "/d3d9.dll");
        }
        
        this.overrideDLL()
            .set("builtin", ["d3d9"])
            .do();
    }
    
    cp(this.prefixDirectory() + "/TMP/dgVoodoo.conf", pathDir);
    cp(this.prefixDirectory() + "/TMP/dgVoodooCpl.exe", pathDir);
        
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
        var options = ["glide", "d3d1-8", "d3d9"];
        var selectedOption = wizard.menu(tr("Please select the dll's to install."), options, "glide");
        wine.wizard(wizard);
        // install selected option
        wine.dgvoodoo2(selectedOption);
        wizard.close();
    }
};

/* exported Verb */
var Verb = Java.extend(org.phoenicis.engines.Verb, verbImplementation);

