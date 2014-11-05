module.exports = function(xmlObj){

	if(xmlObj.$)
	{
	  this.name = xmlObj.$.name;
	  this.isFailure = xmlObj.failure;

	  if(this.isFailure){
			this.failureMessage = xmlObj.failure[0].$.message;
			if(xmlObj['system-out']){
				var sysout = xmlObj['system-out'][0];
				this.screenshots = [sysout.replace(/\n/g, '').replace('.png]]', '.png').replace('[[ATTACHMENT|', '').trim()];
			}
	  }

	}
	else
	{

		this.name = xmlObj.message;
		this.isFailure = xmlObj.failure;
		if(this.isFailure)
		{
			this.failureMessage = this.isFailure;
			this.screenshots = xmlObj.screenshots;
		}

	}

};