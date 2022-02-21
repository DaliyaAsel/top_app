import { Tagprops } from "./Tag.props";

import cn from 'classnames';
import styles from './Tag.module.css';



export const Tag = ({size = 'm', color='ghost', href, children, className, ...props }: Tagprops) : JSX.Element => {

    return(
        <>
          <p className={cn(styles.tag, className, {
              [styles.s] : size == 's',
              [styles.m] : size == 'm',
              [styles.ghost] : color == 'ghost',
              [styles.red] : color == 'red',
              [styles.grey] : color == 'grey',
              [styles.green] : color == 'green',
              [styles.primary] : color == 'primary',
          })}
          {...props}
          >{
              href ? <a>{children}</a> : <>{children}</>
          }

          </p>
        </>
    )
}
