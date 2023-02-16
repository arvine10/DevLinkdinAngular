import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute,
              private profileService : ProfileService,)
  { }

  userInfo : any;
  editProfile! : FormGroup ;
  allJobs : any;
  allEducation: any;
  allSkills : any;

  initForm(){
    this.editProfile = new FormGroup({
        userDetail : new FormGroup({
            userName : new FormControl(this.userInfo.userName),
            state : new FormControl(this.userInfo.state),
            city : new FormControl(this.userInfo.city)
        }),
        aboutMe : new FormGroup({
          detail : new FormControl(this.userInfo.aboutMe)
        }),
        experince : new FormArray(this.initAllExperinceForms()),
        education : new FormArray(this.initAllEducationForms()),
        skills : new FormArray(this.initAllSkillForms())
      });

      // next do the same thing with education 
      // do same thing with skills
  }


  // Experinces: ///////////////////////////////// 


  removeExperince(job : any){
    const index = job.dataset['indexvalue'];
    let experince  = <FormArray>this.editProfile.controls['experince'];
    experince.removeAt(index);
    this.allJobs = experince;
  }

  private createExperinceFormGroup(): FormGroup {
    return new FormGroup({
      id : new FormControl(-1),
        title : new FormControl(''),
        company : new FormControl(''),
        startDate : new FormControl(''),
        endDate : new FormControl(''),
        description : new FormControl('')
    })
  }


  addExperince(){
   const experince = this.editProfile.get('experince') as FormArray;
   experince.push(this.createExperinceFormGroup());
   this.allJobs = experince;
  }

  getExperinceFormBuilder(exp : any){
    let form = new FormGroup({
      id : new FormControl(exp.id),
      title : new FormControl(exp.title),
      company : new FormControl(exp.company),
      startDate : new FormControl(exp.startDate),
      endDate : new FormControl(exp.endDate),
      description : new FormControl(exp.jobDescription)
    })
    return form;
  }

  initAllExperinceForms(){
    let allExperinces = [];
    for(let i=0;i<this.userInfo.experiences.length;i++){
      const exp = this.userInfo.experiences[i];
      allExperinces.push(this.getExperinceFormBuilder(exp));
    }
    return allExperinces;
  }


  ////////////////////////////////////////////////////


  /// Skills: //////////////////////////////////


  getSkillFormBuilder(skill : any){
    let form = new FormGroup({
      attr : new FormControl(skill)
    });
    return form;
  }


  initAllSkillForms(){
    let allSkills = [];
    for(let i=0;i<this.userInfo.skills.length;i++){
      const skill = this.userInfo.skills[i];
      allSkills.push(this.getSkillFormBuilder(skill));
    }
    return allSkills;
  }

  removeSkill(skill : any){
    const index = skill.dataset['indexvalue'];
    let skills  = <FormArray>this.editProfile.controls['skills'];
    console.log(skills);
    skills.removeAt(index);
    this.allSkills = skills;
  }


  private createSkillFormGroup(): FormGroup {
    return new FormGroup({
      attr : new FormControl('')
    })
  }


  addSkill(){
    const skills = this.editProfile.get('skills') as FormArray;
    skills.push(this.createSkillFormGroup());
    this.allSkills = skills;
  }


  ///////////////////////////////////////////////////////////////


  //// Education: //////////////////////////////////////////

  getEducationFormBuilder(education : any){
    let form = new FormGroup({
      school : new FormControl(education[0]),
      degree : new FormControl(education[1]),
      field : new FormControl(education[2])
    });
    return form;
  }

 


  initAllEducationForms(){
    let allEducations = [];
    for(let i=0;i<this.userInfo.education.length;i++){
      const ed = this.userInfo.education[i];
      allEducations.push(this.getEducationFormBuilder(ed));
    }
    return allEducations;
  }


  removeEducation(ed : any){
    const index = ed.dataset['indexvalue'];
    let education  = <FormArray>this.editProfile.controls['education'];
    education.removeAt(index);
    this.allEducation = education;
  }

  private createEducationFormGroup(): FormGroup {
    return new FormGroup({
      school : new FormControl(''),
      degree : new FormControl(''),
      field : new FormControl('')
    })
  }

  addEducation(){
    const education = this.editProfile.get('education') as FormArray;
    education.push(this.createEducationFormGroup());
    this.allEducation = education;
  }

 ///////////////////////////////////////////////////////


 submitForm(event : any){
    // console.log(this.editProfile.controls);
    let returnObj : any = {};
    const skillObj = this.editProfile.controls['skills'].value;
    let skillList = Object.keys(skillObj).map((key) => skillObj[key]['attr']);
    
    let educationObj = this.editProfile.controls['education'].value;
    let educationList = Object.keys(educationObj).map((key) => [educationObj[key]['school'], 
                                                                educationObj[key]['degree'],
                                                                educationObj[key]['field']
                                                               ]);
    console.log(educationList);


    returnObj['userDetail'] = this.editProfile.controls['userDetail'].value;
    returnObj['aboutMe'] = this.editProfile.controls['aboutMe'].value;
    returnObj['education'] = this.editProfile.controls['education'].value;
    returnObj['experince'] = this.editProfile.controls['experince'].value;
    returnObj['skills'] = this.editProfile.controls['skills'].value;
    console.log(returnObj);
 }


  

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    this.profileService.getUserById(id).subscribe(
      (val)=>{
       this.userInfo = val;
       console.log(this.userInfo);
       // make segments all within reactive form
       this.initForm();
       this.allJobs = this.editProfile.controls['experince'] as FormArray;
       this.allEducation = this.editProfile.controls['education'] as FormArray;
       this.allSkills = this.editProfile.controls['skills'] as FormArray;
      }
    )


  }

}
