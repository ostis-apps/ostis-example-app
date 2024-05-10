macro(subdir_list result current_dir)
	file(GLOB children RELATIVE ${current_dir} ${current_dir}/*)
	set(dirlist "")
	foreach (child ${children})
		if (IS_DIRECTORY ${current_dir}/${child})
			list(APPEND dirlist ${child})
		endif ()
	endforeach ()
	set(${result} ${dirlist})
endmacro()
