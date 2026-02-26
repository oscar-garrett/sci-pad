use serde::Serialize;
use walkdir::WalkDir;

#[derive(Serialize)]
struct FileNode {
    name: String,
    path: String,
    is_dir: bool, 
    parent_path: Option<String>,
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
        .invoke_handler(tauri::generate_handler![get_file_tree])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
