## spring
#### spring-context-support
spring-core和spring-beans是spring的基石，提供了最基本的依赖注入功能，spring-context
建立在core和beans上，提供了更高层的API，其核心是ApplicationContext，spring-context-support为
第三方库整合进spring应用上下文提供了支持。



#### 泛型

#### Spring AopContext.currentProxy()
在Spring中只有代理类才会被切入，如果在某个service中有需要切入的方法，这个service中的
其他地方调用这个方法的时候需要使用==AopContext.currentProxy()==获取当前service的代理类。
##### Spring的AOP实现原理
**AOP中的基础概念**
- 连接点
- 通知
- 切点
- 切面
- 目标对象
- AOP代理
- 织入
- Advisor
**Spring中实现AOP使用JDK动态代理和CGlib动态代理**
默认如果目标对象是接口时使用JDK动态代理。
>JDK动态代理
接口类
```
public interface UserService{
    public int add();
}
```
接口实现类
```
public class UserServiceImpl implements UserService{
    @Override
    public int add(){
        System.out.println("--------------------add----------------------")
        return 0;
    }
}
```
JDK动态代理的两个核心类（接口）分别是Proxy类和InvocationHandler接口。
首先是实现InvocationHandler的类：
```
public class JDKProxy implements InvocationHandler {
    //目标对象
    private Object targetObject;

    public JDKProxy(Object targetObject){
        this.targetObject = targetObject;
    }
    //proxy表示代理，method表示原对象被调用的方法，args表示方法的参数。
    @Override
    public Object invoke(Object proxy,Method method,Object[] args){
        Object ret = null;
        System.out.println("方法之前：" + System.currentTimeMillis());
        //调用目标方法
        ret = method.invoke(targetObject, args);
        System.out.println("方法之后：" + System.currentTimeMillis());
        return ret;
    }
    
}
```
使用方法
```
public class Main {
    public static void main(String[] args) {
        UserService um = new UserServiceImpl();
        JDKProxy time = new JDKProxy(um);
        //第一个参数产生代理对象的类加载器
        //第二个参数目标对象的接口数组
        //第三个参数就是实现InvocationHandler接口的类实例
        um = (UserService) Proxy.newProxyInstance(um.getClass().getClassLoader(), 
                um.getClass().getInterfaces(), time);
        um.addUser("1111", "张三");
    }
}
```

>CGLIB动态代理
CGLIB的两个核心类（接口）是MethodInterceptor和Enhancer。
```
public class CglibProxy implements MethodInterceptor {
    private Object target;
    public TimeInterceptor(Object target) {
        this.target = target;
    }
    //1.生成的代理类实例。2.被代理对象的方法引用。3.方法参数值数组。4.代理类对方法的代理引用。
    @Override
    public Object intercept(Object proxy, Method method,
                            Object[] args, MethodProxy invocation) throws Throwable {
        System.out.println("方法之前："+System.currentTimeMillis());
        Object ret = invocation.invoke(target, args);
        System.out.println("方法之后："+System.currentTimeMillis());
        return ret;
    }
}
```
使用：
```
public class Main {
    public static void main(String[] args) {
        UserService um = new UserService();
        CglibProxy time = new CglibProxy(um);
        um = Enhancer.create(um.getClass(), time);
        um.addUser("1111", "张三");
    }
}
```



##### Spring中的IOC
**实现IOC的主要设计模式是工厂模式**
Spring IOC容器通过XML、注解等方式配置类与类之间的依赖关系，完成对象的创建和依赖的注入。

#### 枚举
