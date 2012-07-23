<?php
$data = file_get_contents('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=cantlin&api_key=9cc0285f5dce77d8a4720ffedff99ba5');

$tracks = new SimpleXMLElement($data);

echo json_encode($tracks->recenttracks->track[0]);
?>