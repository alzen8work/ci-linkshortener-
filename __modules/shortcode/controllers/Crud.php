<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Crud extends MY_Controller {

	protected  $controller;
	protected $_table;
	protected $_primary_key;
	
	function __construct()
	{
		parent::__construct();
		$this->controller = 'shortcode';
		$this->load->model('shortcode_model');
		$this->load->model('clicks_model');
		$this->_table = 'urls';
	}
	
	public function test2(){
		echo '<a href="https://demo-alextehkh.c9users.io/u/shortcode/test" >test2</a>'	;
	}
	
	public function test(){
		$test3 = (empty($_SERVER['HTTP_USER_AGENT']))?'no HTTP_USER_AGENT':$_SERVER['HTTP_USER_AGENT'];
		
		_debug_array($test3);
		
		$test2 = (empty($_SERVER['HTTP_REFERER']))?'no HTTP_REFERER':$_SERVER['HTTP_REFERER'];
		
		_debug_array($test2);
		
		
		$test = ip_info();
		_debug_array($test);
		
		$test0 =  user_ip();
		_debug_array($test0);
		
		
		// echo $_SERVER['HTTP_USER_AGENT'] . "\n\n";

		// $browser = get_browser(null, true);
		// print_r($browser);
	}
	
	//this function will redirect to URL base on the shortcode given to query the DB else go to 404
    public function get_shortcode($shortcode = '') 
    {
		$seg = $this->get_segment();
		
		//get the last segment of the URL
		foreach ($seg as $seg_key => $seg_val){
			if(!empty($seg_val) && $seg_val != 'get_shortcode'){
				$shortcode = $seg_val;        		
			}
		}
		
		if(!empty($shortcode)){
			$result =  $this->shortcode_model->get_url($shortcode);
			$saved	= '';	
			// _debug_array($result);	 exit;	
			if(!empty($result['success']))
			{
				// _debug_array($result);	
				if(!empty($result['data']['url_id']))
				{
					$data['urls_id'] = $result['data']['url_id'];
					$data['ip'] 	=  user_ip();
					$saved = $this->clicks_model->add($data);
				}
			}
			
			if(!empty($saved)){
				
				redirect($result['url']);		
			}else{
				$this->custom_404($result);
			}	
		}
    	
    }

	//query that return empty will redirect here
    function custom_404($arr = array()) 
    {	
		$data['success'] = false;
		
		$data['msg']	 = '';
		if(!empty($arr['url']))
			$data['msg']	 = sprintf($this->lang->line('msg[404_desc]'), '<b>'.$arr['url'].'</b>');
		
		$data['cssfiles'] 	= $this->vars['cssfiles'];
		$data['jsfiles'] 	= $this->vars['jsfiles'];
		$data['jscripts'] 	= $this->vars['jscripts'];

		$this->load->view('header', $data);
		$this->load->view('nav_login', $data);
		$this->load->view('404', $data);
		$this->load->view('footer', $data);
    }

	//generic save doc from <form action=""> of this controller
	function save_doc()
	{
		if(!$_POST) redirect(base_url($this->controller.'/detail'));
		
		$return_val					= array(); 
		$return_val['success'] 		= false;
		if(isset($_POST['processtype']['save'])){
			
			$result 		        	= remove_protocols($_POST['urls']['url']);
			$_POST['urls']['url'] 		= remove_url_last_slash($result['url']);
			$_POST['urls']['protocol'] 	= $result['protocol'];
			
			$validation_arr = $this->_set_form_validation($this->_table, 1);
			$this->form_validation->set_error_delimiters('&nbsp;','&nbsp;');
			
			if($this->form_validation->run() == false){
				$return_val['msg'] 		= validation_errors(); //ucwords(lang('msg[invalid]'));
			}
			else
			{
				//submitting data
				$result 			= remove_protocols($_POST['urls']['url']);
				$data['url'] 		= remove_url_last_slash($result['url']);
				$data['protocol'] 	= $result['protocol'];
				$this->shortcode_model->add($data);
				
				$return_val['success'] 	= true;
				$return_val['msg'] 		= ucwords(lang('msg[generated]'));    		
				$return_val['url'] 		= base_url(str_replace('=','-', base64_encode($this->db->insert_id())));
			}
		}
		$this->detail($return_val);
	}

	//form of detail page
	public function detail($data=array())
	{
		$this->vars['jscripts'][]	= 'var controller="'.$this->controller.'";';
		$this->vars['jscripts'][]	= 'var swal_title="'.ucwords(lang('btn[your_shorten_url]')).'";';
		$this->vars['jscripts'][]	= 'var copy_url="'.ucwords(lang('btn[copy_url]')).'";';
		$this->vars['jscripts'][]	= 'var btn_done="'.ucwords(lang('btn[done]')).'";';

		if(!empty($data['msg'])) $this->vars['jscripts'][]	= 'var msg="'.$data['msg'].'";';
		if(empty($data['url'])) $this->vars['jscripts'][]	= 'var shortcode="";';
		else $this->vars['jscripts'][]						= 'var shortcode="'.$data['url'].'";';
		
		$data['cssfiles'] 	= $this->vars['cssfiles'];
		$data['jsfiles'] 	= $this->vars['jsfiles'];
		$data['jscripts'] 	= $this->vars['jscripts'];
		$data['form_action'] = base_url($this->controller.'/save_doc');

		$this->load->view('header', $data);
		$this->load->view('nav_login', $data);
		$this->load->view('detail', $data); //load the single view get_url and send any data to it
		$this->load->view('footer', $data);
	}

	//listing page	
	public function index()
	{
		$this->detail();
    }

	//a request to return statistic of a given shortcode
    public function api_request($shortcode = '') 
    {
		$seg = $this->get_segment();
		
		//get the last segment of the URL
		foreach ($seg as $seg_key => $seg_val){
			if(!empty($seg_val) && $seg_val != 'api' && $seg_val != 'api_request'){
				$shortcode = $seg_val;        		
			}
		}
		
		if(empty($shortcode)){
			echo 'no data';
		}else{
			// echo $shortcode;
			$result =  $this->shortcode_model->get_url($shortcode);
			// _debug_array($result);
			if(!empty($result['data']['url_id'])){
				
				$result['data']['short_url'] = base_url($shortcode);
				
				$json = $this->clicks_model->gen_data($result);
				
				// _debug_array($json); exit;
				
				
				// $this->db->from('clicks');
				// $this->db->where('urls_id', $result['data']['url_id']);
				// $saved = $this->db->count_all_results();
				// _debug_array($saved);
				
				
				$this->output->set_header("Pragma: no-cache");
				$this->output->set_header("Cache-Control: no-store, no-cache");
				$this->output->set_content_type('application/json')->set_output(json_encode($json));	
			}
		}
    }
    
	
    //validation methods
	function _set_form_validation($mode = 'urls', $auto_set_rules = '1')
	{		
		$table_1 = 'urls';

		$config['urls'][] =	array(
		    'field' => $table_1.'[url]', 
		    'label' => ucwords(lang('txt[url]')),
		    'rules' => 'trim|required|valid_url|min_length[5]|max_length[250]'); //add callback__validate_code_exist for further functions 

		// need if u need to set rules outside this function, set $auto_set_rules = 0
		if($auto_set_rules == '1') $this->form_validation->set_rules($config[$mode]);
		else return $config[$mode]; 
	}
	
    //callback validation methods
	function _validate_code_exist()
	{
		$arr['field_to_check']	= 'url';
		$arr['field_name']  	= 'url';
		$arr['validate_func'] 	= '_validate_code_exist';
		return $this->shortcode_model->validate_field_exist($arr);
	}
}
