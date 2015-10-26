<?php namespace Slam\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use Log;
use DB;
use Illuminate\Support\Collection;
use Slam\User;
use Slam\Model\Participant;

class ParticipantController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

	public function index() {
        $participants = Participant::all();
        return $participants;
	}

	public function show($id) {
        $participant = Participant::find($id);
        $participant->competitions;
        return $participant;
	}


	public function store(Request $request) {
        $user = User::find($request['user']['sub']);
        $participant = new Participant;

        DB::transaction(function() use ($request, $participant, $user) {

            $participant->username = $request->input('name');
            $participant->save();
                 
        });

        return $participant;
	}

	public function update(Request $request, $id) {
        $participant = Participant::find($id);
        DB::transaction(function() use ($request, $participant, $user) {
            $participant->username = $request->input('name');
            $participant->save();
        });

        return $participant;
	}

	public function destroy($id) {
        Participant::destroy($id);
	}


}




