import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsService } from './events.service';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';



@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    public utility: UtilityService,
    public api: ApiService,
    private events: EventsService,
  ) {
    // console.log('Hello NetworkProvider Provider');
  }

  // post requests -- start
  isUserExistWithPhoneNumber(data) {
    return this.httpPostResponse('is_user_exist_with_phonenumber', data, null, false)
  }

  login(data) {
    return this.httpPostResponse('login', data, null, true)
  }

  register(data) {
    return this.httpPostResponse('signup', data, null, true)
  }

  saveFcmToken(data) {
    return this.httpPostResponse('save_fcm_token', data, null, false, false)
  }

  forgetPassword(data) {
    return this.httpPostResponse('forgetpassword', data, null, true)
  }

  updatePassword(data) {
    return this.httpPostResponse('updatepassword', data, null, true)
  }

  checkIfDummyPhoneExist(id, data) {
    return this.httpPostResponse('check_if_dummy_phone_exist', data, id, true)
  }

  updateProfile(data) {
    return this.httpPostResponse('profile', data, null, true)
  }

  sendCodeToBecomeResident(data) {
    return this.httpPostResponse('resident_verification', data, null, true)
  }

  sendCodeToVerifyEmail(data) {
    return this.httpPostResponse('email_verification', data, null, true)
  }

  updatePassDirections(data) {
    return this.httpPostResponse('update_pass_directions', data, null, true)
  }

  removeFromFavorites(data) {
    return this.httpPostResponse('remove_contacts_from_fav', data, null, false)
  }

  deleteContactArray(data) {
    return this.httpPostResponse('delete_contact_array', data, null, false)
  }

  sendRequestForAPass(data) {
    return this.httpPostResponse('send_request_for_pass', data, null, true)
  }

  addToFavorites(data) {
    return this.httpPostResponse('add_contacts_to_fav', data, null, false)
  }

  addContactsToGroup(data, loader = true) {
    return this.httpPostResponse('add_contacts_to_group', data, null, loader)
  }

  removeFromGroup(data) {
    return this.httpPostResponse('remove_contacts_from_group', data, null, false)
  }

  addVendorToList(data) {
    return this.httpPostResponse('add_vendor_to_list', data, null, true)
  }

  editVendorToList(data) {
    return this.httpPostResponse('edit_vendor_to_list', data, null, true)
  }

  addEventToList(data) {
    return this.httpPostResponse('add_event_to_list', data, null, true)
  }

  editEventToList(data) {
    return this.httpPostResponse('edit_event_to_list', data, null, true)
  }

  getAddedHourDate(data) {
    return this.httpPostResponse('get_added_hour_date', data, null, false)
  }

  createNewPass(data) {
    return this.httpPostResponse('create_new_pass', data, null, true)
  }

  addVehicle(data) {
    return this.httpPostResponse('add_vehicle', data, null, true)
  }

  editVehicle(id, data) {
    return this.httpPostResponse('edit_vehicle', data, id, true)
  }

  setDefaultVehicle(id) {
    return this.httpPostResponse('set_default_vehicle', null, id, false)
  }

  deleteVehicle(id) {
    return this.httpPostResponse('delete_vehicle', null, id, true)
  }

  getPassVehicle(data) {
    return this.httpPostResponse('fetch_pass_vehicle', data, null, false);
  }

  setPassVehicle(data) {
    return this.httpPostResponse('set_pass_vehicle', data, null, false);
  }

  createContactGroup(data) {
    return this.httpPostResponse('create_contact_group', data, null, true)
  }

  updateContactGroup(id, data) {
    return this.httpPostResponse('update_contact_group', data, id, true)
  }

  addContactWithOnlyId(id) {
    return this.httpPostResponse('add_contact_with_only_id', {}, id, true)
  }

  getSingleContact(data) {
    return this.httpPostResponse('get_single_contact', data, null, true)
  }

  createFamilyMember(data) {
    return this.httpPostResponse('create_family_member', data, null, true)
  }

  rejectPassRequest(data) {
    return this.httpPostResponse('reject_pass_request', data, null, true)
  }

  acceptPassRequest(data) {
    return this.httpPostResponse('accept_pass_request', data, null, true)
  }

  updateUserNotificationSettings(data) {
    return this.httpPostResponse('update_user_notification_settings', data, null, true);
  }

  setAllowParentalPermission(data) {
    return this.httpPostResponse('set-allow-parental-flag', data, null, false);
  }

  setManageFamilyPermission(data) {
    return this.httpPostResponse('set-manage-permission-flag', data, null, false);
  }

  setSendPassesPermission(data) {
    return this.httpPostResponse('set-send-passes-flag', data, null, false);
  }

  deleteFamilyMemberArray(data) {
    return this.httpPostResponse('delete_family_member_array', data, null, true);
  }

  syncContacts(data) {
    return this.httpPostResponse('sync_contacts', data, null, true);
  }

  addContactToPass(passid, data) {
    return this.httpPostResponse('add_contact_to_pass', data, passid, true)
  }

  phoneNumberSync(data) {
    return this.httpPostResponse('phone_number_sync', data, null, true)
  }

  retractSentPass(id, data) {
    return this.httpPostResponse('retract_sent_pass', data, id, true)
  }


  checkEmailAlreadyInUse(data) {
    return this.httpPostResponse('check_email_already_in_use', data, null, true)
  }

  checkIfDuplicateEmailVerificationPending(id, data) {
    return this.httpPostResponse('check_if_duplicate_email_verification_pending', data, id, false)
  }

  verifyEmailAddress(data) {
    return this.httpPostResponse('verify_email_address', data, null, true)
  }

  setParentalControlOptions(id, data) {
    return this.httpPostResponse('set_parental_control_options', data, id, true)
  }

  markReadNotification(data) {
    return this.httpPostResponse('mark_read_notification', data, null, false)
  }

  markReadPCNotification(data) {
    return this.httpPostResponse('mark_read_pc_notification', data, null, false)
  }

  sendRequestToBecomeResident(data) {
    return this.httpPostResponse('send_request_to_become_resident', data, null, true)
  }

  // post requests -- ends

  // get requests -- start
  getUser(loader = false) {
    return this.httpGetResponse('user', null, loader, false)
  }

  getVendorList() {
    return this.httpGetResponse('get_vendor_list', null, false, true)
  }

  getResidentsListToRequestPass() {
    return this.httpGetResponse('get_residents_list_to_request_pass', null, true, true)
  }

  getLicenceLockStatus() {
    return this.httpGetResponse('get_licence_lock_status', null, false, true)
  }

  getVehicleList() {
    return this.httpGetResponse('get_vehicle_list', null, false, true)
  }

  getAllMyKeys() {
    return this.httpGetResponse('get_all_my_keys', null, true, false);
  }

  getUserReceivedPasses(id, params, loader = true) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_active_passes_data/' + id + '?' + str, null, loader)
  }

  getUserReceivedPassesDates(id, params) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_active_pass_dates/' + id + '?' + str, null, false)
  }

  getUserSentPasses(id, params, loader = true) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_sent_passes_data/' + id + '?' + str, null, loader);
  }

  getUserSentPassesDates(id, params) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_sent_pass_dates/' + id + '?' + str, null, false)
  }

  getUserScannedPasses(id, params, loader = true) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_scanned_passes_data/' + id + '?' + str, null, loader);
  }

  getUserScannedPassesDates(id, params) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_scanned_pass_dates/' + id + '?' + str, null, false)
  }

  getPassScanlogs(id, params) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_pass_scan_log/' + id + '?' + str, null, true)
  }

  getOnePageNotifications(params) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_onepage_notifications_with_pagination' + '?' + str, null, false)
  }

  getParentalNotifications(params) {
    let str = this.serialize(params);
    return this.httpGetResponse('get_parental_notifications' + '?' + str, null, false)
  }

  serialize = function (obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }


  getUserArchievePasses(id) {
    return this.httpGetResponse('get_user_archieve_passes', id, true)
  }



  getContacts(offset = 0, is_favourite = 0, loader = false) {
    return this.httpGetResponse('get_contacts?offset=' + offset + '&is_favourite=' + is_favourite, null, loader)
  }

  getSearchContacts(search = '', offset = 0, is_favourite = 0) {
    return this.httpGetResponse('get_contacts?search=' + search + '&offset=' + offset + '&is_favourite=' + is_favourite, null, true)
  }



  getGroupContactList(search = '', group_id, offset = 0, loader = true) {
    return this.httpGetResponse('get_contact_groups?search=' + search + '&contact_group_id=' + group_id + '&offset=' + offset, null, loader)
  }

  getContactGroups() {
    return this.httpGetResponse('get_contact_groups', null, true)
  }

  getContactGroupByUserId(loader = true) {
    return this.httpGetResponse('get_groups_by_user_id', null, loader);
  }

  deleteContactGroup(id) {
    return this.httpGetResponse('delete_contact_group', id, true)
  }

  getUserEvents() {
    return this.httpGetResponse('get_user_events', null, true)
  }

  getUserEvent(id) {
    return this.httpGetResponse('get_user_events?event_id=' + id, null, false)
  }

  removeEventFromList(qrid) {
    return this.httpGetResponse('remove_event_from_list', qrid, false)
  }

  removeVendorFromList(id) {
    return this.httpGetResponse('remove_vendor_from_list', id, false)
  }

  getContactGroup(id) {
    return this.httpGetResponse('get_contact_group', id, true)
  }

  getOneTimeContactsData(loader = true) {
    return this.httpGetResponse('get_one_time_contacts_data', null, loader);
  }

  getPasseDetails(id) {
    return this.httpGetResponse('get_pass_details', id, false)
  }

  getEditPasseDetails(id) {
    return this.httpGetResponse('get_pass_data_for_edit', id, true)
  }

  checkIfCellNumberUserCanSentPass(num) {
    return this.httpGetResponse('check_if_user_num_can_sent_pass', num, true)
  }

  checkIfCellNumberUserExists(num) {
    return this.httpGetResponse('check_if_user_num_exist', num, true, true)
  }

  getUnreadAnnouncements() {
    return this.httpGetResponse('get_unread_announcements', null, true)
  }

  removeNotification(id) {
    return this.httpGetResponse('remove_notification', id, false)
  }

  getNotificationsCount() {
    return this.httpGetResponse('notification_count', null, false)
  }





  getSoundLocation() {
    return this.httpGetResponse('getSoundLocation', null, false, false)
  }

  getFamilyMembers() {
    return this.httpGetResponse('get_family_members', null, true)
  }

  getMyFamilyMembers() {
    return this.httpGetResponse('get_my_family_members', null, true)
  }

  getContactToPass(id) {
    // return this.httpGetResponse('get_recipents_of_pass', id, true )
    return this.httpGetResponse('get_contact_to_pass', id, true)
  }

  removePassRecipient(id) {
    return this.httpGetResponse('remove_pass_recipient', id, true)
  }

  togglePassEnable(id, state) {
    return this.httpGetResponse('toggle_pass_enable', id + "/" + state, true)
  }

  setReadAnnouncements(id) {
    return this.httpGetResponse('set_read_announcements', id, true)
  }

  getParentalControlOptions(id) {
    return this.httpGetResponse('get_parental_control_options', id, true)
  }

  getListOfCommunities() {
    return this.httpGetResponse('get_list_of_communities', null, true)
  }






  // get requests -- end




  httpPostResponse(key, data, id = null, showloader = false, showError = true, contenttype = 'application/json') {
    return this.httpResponse('post', key, data, id, showloader, showError, contenttype);
  }

  httpGetResponse(key, id = null, showloader = false, showError = true, contenttype = 'application/json') {
    
    return this.httpResponse('get', key, {}, id, showloader, showError, contenttype);
  }

  // default 'Content-Type': 'application/json',
  httpResponse(type = 'get', key, data, id = null, showloader = false, showError = true, contenttype = 'application/json'): Promise<any> {

    return new Promise( ( resolve, reject ) => {

      if (showloader == true) {
        this.utility.showLoader();
      }

      const _id = (id) ? '/' + id : '';
      const url = key + _id;

      const seq = (type == 'get') ? this.api.get(url, {}) : this.api.post(url, data);

      seq.subscribe((res: any) => {
        if (showloader == true) {
          this.utility.hideLoader();
        }
        console.log(res);
        resolve(res)
        
        // this.utility.presentSuccessToast(res['message']);

      }, err => {

        let error = err['error'];
        if (showloader == true) {
          this.utility.hideLoader();
        }

        if (showError) {
          this.utility.presentFailureToast(error['message']);
        }

        console.log(err);

        reject(null);

      });

    });

  }

  showFailure(err) {
    // console.error('ERROR', err);
    var _error = (err) ? err['message'] : "check logs";
    this.utility.presentFailureToast(_error);
  }

  getActivityLogs() {
    return this.httpGetResponse('get_activity_logs', null, true)
  }

}
