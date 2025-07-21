
import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({children, to}: {children: ReactNode, to: string}) {

    return(
        <div>

            <MenuItem
                component={NavLink}
                to={to}
                sx={{
                    fontsize: '1.2rem',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: 'inherit',
                    '&.active': {
                        color: 'yellow'
                    }
                }}
            > 
                {children}
            </MenuItem>

        </div>
    )
}