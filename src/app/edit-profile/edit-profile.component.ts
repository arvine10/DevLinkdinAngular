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
        title : new FormControl(''),
        company : new FormControl(''),
        startDate : new FormControl(''),
        endDate : new FormControl(''),
        description : new FormControl('')
    })
  }


  addExperince(){
   const experince = this.editProfile.get('experince') as FormArray;
   this.userInfo.experiences.push({});
   experince.push(this.createExperinceFormGroup());
   this.allJobs = experince;
   console.log(experince);
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


 ///////////////////////////////////////////////////////


  

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    this.profileService.getUserById(id).subscribe(
      (val)=>{
       this.userInfo = val;
       console.log(this.userInfo);
       // make segments all within reactive form
       this.initForm();
       this.allJobs = this.editProfile.controls['experince'] as FormArray;
      }
    )


  }

}
