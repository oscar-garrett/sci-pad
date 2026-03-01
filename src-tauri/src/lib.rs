use serde::Serialize;
use walkdir::WalkDir;
use std::fs;

#[derive(Serialize)]
struct FileNode {
    name: String,
    path: String,
    is_dir: bool, 
    parent_path: Option<String>,
}

#[tauri::command]
fn read_file_content(path: String) -> Result<String, String> {
    // Attempt to read the file, and if it fails, convert the error to a String
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_file_tree(target_path: String) -> Result<Vec<FileNode>, String> {
    let mut files = Vec::new();

    let walker = WalkDir::new(&target_path).into_iter();

    for entry in walker.filter_map(|e| e.ok()) {
        let is_dir = entry.file_type().is_dir();
        let name = entry.file_name().to_string_lossy().into_owned();
        let path = entry.path().to_string_lossy().into_owned();

        let parent_path = entry
            .path()
            .parent()
            .map(|p| p.to_string_lossy().into_owned());

        files.push(FileNode{
            name,
            path,
            is_dir,
            parent_path
        })
    }

    Ok(files)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_file_tree,
            read_file_content
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
